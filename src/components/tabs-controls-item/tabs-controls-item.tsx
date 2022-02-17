import { MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentTab } from '../../store/actions';
import { CurrentTab } from '../../utils/const';

export type TabsControlsItemProps = {
  children: string,
  currentTab: CurrentTab,
}

function TabsControlsItem({ children, currentTab, }: TabsControlsItemProps): JSX.Element {
  const dispatch = useDispatch();
  const classNames = ['button', 'button--medium', 'tabs__button'];
  if (String(currentTab) !== children) {
    classNames.push('button--black-border');
  }

  const onClickHandle = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    if (children === CurrentTab.Characteristics) {
      dispatch(setCurrentTab(CurrentTab.Characteristics));
    }
    if (children === CurrentTab.Description) {
      dispatch(setCurrentTab(CurrentTab.Description));
    }
  };

  return (
    <a onClick={onClickHandle} className={classNames.join(' ')} href='#characteristics'>{children}</a>
  );
}

export default TabsControlsItem;
