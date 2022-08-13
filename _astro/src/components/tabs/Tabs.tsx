import type { ComponentChildren } from 'preact';
import { useEffect, useRef } from 'preact/hooks';
import { genTabId } from './store';
import '../TabGroup/TabGroup.css';
import styles from './Tabs.module.css';
import { useTabState } from './useTabState';

const tabSlotKey = 'tab.' as const;
const panelSlotKey = 'panel.' as const;

type TabSlot = `${typeof tabSlotKey}${string}`;
type PanelSlot = `${typeof panelSlotKey}${string}`;

function isTabSlotEntry(entry: [string, ComponentChildren]): entry is [TabSlot, ComponentChildren] {
	const [key] = entry;
	return key.startsWith(tabSlotKey);
}

function isPanelSlotEntry(entry: [string, ComponentChildren]): entry is [PanelSlot, ComponentChildren] {
	const [key] = entry;
	return key.startsWith(panelSlotKey);
}

function getBaseKeyFromTab(slot: TabSlot) {
	return slot.replace(new RegExp(`^${tabSlotKey}`), '')
}

function getBaseKeyFromPanel(slot: PanelSlot) {
	return slot.replace(new RegExp(`^${panelSlotKey}`), '')
}

type Props = {
	[key: TabSlot | PanelSlot]: ComponentChildren;
	sharedStore?: string;
}

export default function Tabs({ sharedStore, ...slots }: Props) {
	const tabId = genTabId()
	const tabs = Object.entries(slots).filter(isTabSlotEntry)
	const panels = Object.entries(slots).filter(isPanelSlotEntry)
	/** Used to focus next and previous tab on arrow key press */
	const tabButtonRefs = useRef<Record<TabSlot, HTMLButtonElement | null>>({})
	const scrollToTabRef = useRef<HTMLButtonElement | null>(null)

	const firstPanelKey = panels[0]?.[0] ?? ''
	const [curr, setCurr] = useTabState(getBaseKeyFromPanel(firstPanelKey), sharedStore)

	function updateCurr(tabSlot: TabSlot, el: HTMLButtonElement | null) {
		if (sharedStore) {
			// Prevents scroll jumping due to layout shift
			// from other tab views with the same store
			scrollToTabRef.current = el
		}
		setCurr(getBaseKeyFromTab(tabSlot))
	}

	useEffect(() => {
		if (scrollToTabRef.current) {
			scrollToTabRef.current.scrollIntoView({ behavior: 'smooth' })
			scrollToTabRef.current = null
		}
	}, [curr])

	function moveFocus(event: KeyboardEvent) {
		if (event.key === 'ArrowLeft') {
			const currIdx = tabs.findIndex(([key]) => getBaseKeyFromTab(key) === curr)
			if (currIdx > 0) {
				const [prevTabKey] = tabs[currIdx - 1]
				updateCurr(prevTabKey, tabButtonRefs.current[prevTabKey])
				tabButtonRefs.current[prevTabKey]?.focus()
			}
		}
		if (event.key === 'ArrowRight') {
			const currIdx = tabs.findIndex(([key]) => getBaseKeyFromTab(key) === curr)
			if (currIdx < tabs.length - 1) {
				const [nextTabKey] = tabs[currIdx + 1]
				updateCurr(nextTabKey, tabButtonRefs.current[nextTabKey])
				tabButtonRefs.current[nextTabKey]?.focus()
			}
		}
	}

	return (
		<div className={styles.container}>
			<div className={styles['tab-scroll-overflow']}>
				<div className={`${styles.tablist} TabGroup no-flex`} role="tablist" onKeyDown={moveFocus}>
					{tabs.map(([key, content]) => (
						<button
							ref={el => tabButtonRefs.current[key] = el}
							onClick={() => updateCurr(key, tabButtonRefs.current[key])}
							aria-selected={curr === getBaseKeyFromTab(key)}
							tabIndex={curr === getBaseKeyFromTab(key) ? 0 : -1}
							role="tab"
							type="button"
							className={styles.tab}
							id={`${tabId}-${key}`}
							key={key}
						>
							{content}
						</button>
					))}
				</div>
			</div>
			{panels.map(([key, content]) => (
				<div
					hidden={curr !== getBaseKeyFromPanel(key)}
					role="tabpanel"
					aria-labelledby={`${tabId}-${tabSlotKey}${getBaseKeyFromPanel(key)}`}
					className={styles.tabpanel}
					key={key}
				>
					{content}
				</div>
			))}
		</div>
	)
}
