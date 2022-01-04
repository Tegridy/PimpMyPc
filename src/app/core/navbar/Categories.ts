import {Param} from '../../products/Param';

export const categories = [
  {
    name: 'Laptops',
    iconName: 'laptop-outline',
    subMenu: [
      {
        name: 'Laptops/Ultrabooks/Notebooks',
        innerMenu: [
          {name: 'Notebook/Laptop 15"', filterParams: new Param('displaySize', 15)},
          {name: 'Notebook/Laptop 16"', filterParams: new Param('displaySize', 16)},
          {name: 'Notebook/Laptop 17"', filterParams: new Param('displaySize', 17)},
        ],
      },
    ],
    endpointName: 'laptops',
  },
  {
    name: 'Computers',
    iconName: 'desktop-outline',
    subMenu: [{name: 'Personal Computers', endpointName: 'computers'}, {name: 'Gaming Computers', endpointName: 'computers'}],
    endpointName: 'computers'
  },
  {name: 'Smartphones', iconName: 'phone-portrait-outline', endpointName: 'smartphones'},
  {name: 'Build PC', iconName: 'hammer-outline'},
  {
    name: 'Computer assets',
    iconName: 'hardware-chip-outline',
    subMenu: [
      {
        name: 'Processors', innerMenu: [{name: 'Intel', filterParams: new Param('title', 'intel')},
          {name: 'AMD', filterParams: new Param('title', 'amd')}], endpointName: 'processors'
      },
      {name: 'Memory RAM', endpointName: 'rams'},
      {
        name: 'Graphic cards', innerMenu: [{name: 'Nvidia', filterParams: new Param('title', 'nvidia')},
          {name: 'AMD', filterParams: new Param('title', 'amd')}], endpointName: 'graphics'
      },
      {name: 'Motherboards', endpointName: 'motherboards'},
      {
        name: 'Hard drives', innerMenu: [{name: 'SSD', filterParams: new Param('type', 'ssd')},
          {name: 'HDD', filterParams: new Param('type', 'hdd')}], endpointName: 'drives'
      },
      {name: 'Power supply', endpointName: 'power-supplies'},
      {name: 'Cases', endpointName: 'cases'},
    ],
    endpointName: 'processors'
  },
  {
    name: 'Peripherals',
    iconName: 'print-outline',
    subMenu: [
      {name: 'Monitors', endpointName: 'monitors'},
      {name: 'Computer mouse', endpointName: 'mouses'},
      {name: 'Computer keyboard', endpointName: 'keyboards'},
    ],
  },
];
