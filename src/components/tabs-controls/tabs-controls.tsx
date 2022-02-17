import React from 'react';
import { CurrentTab } from '../../utils/const';
import TabsControlsItem from '../tabs-controls-item/tabs-controls-item';

export type TabsControlsProps = {
  currentTab: CurrentTab,
}

function TabsControls({ currentTab, }: TabsControlsProps): JSX.Element {
  return (
    <React.Fragment>
      <TabsControlsItem currentTab={currentTab}>Характеристики</TabsControlsItem>
      <TabsControlsItem currentTab={currentTab}>Описание</TabsControlsItem>
    </React.Fragment>
  );
}

export default TabsControls;
