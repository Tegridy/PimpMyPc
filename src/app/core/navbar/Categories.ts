import { MenuCategory } from '../../shared/model/MenuCategory';

export const categories: MenuCategory[] = [
  {
    name: 'Laptops',
    iconName: 'laptop-outline',
    firstLevelMenu: [
      {
        name: 'Laptops/Ultrabooks/Notebooks',
        secondLevelMenu: [
          {
            name: 'Notebook/Laptop 15"',
            filterParams: { page: 1, displaySize: 15 },
          },
          {
            name: 'Notebook/Laptop 16"',
            filterParams: { page: 1, displaySize: 16 },
          },
          {
            name: 'Notebook/Laptop 17"',
            filterParams: { page: 1, displaySize: 17 },
          },
        ],
        endpointName: 'laptops',
      },
    ],
    endpointName: 'laptops',
  },
  {
    name: 'Computers',
    iconName: 'desktop-outline',
    endpointName: 'computers',
  },
  {
    name: 'Smartphones',
    iconName: 'phone-portrait-outline',
    endpointName: 'smartphones',
  },
  {
    name: 'Computer assets',
    iconName: 'hardware-chip-outline',
    firstLevelMenu: [
      {
        name: 'Processors',
        secondLevelMenu: [
          { name: 'Intel', filterParams: { page: 1, title: 'intel' } },
          { name: 'AMD', filterParams: { page: 1, title: 'amd' } },
        ],
        endpointName: 'processors',
      },
      { name: 'Memory RAM', endpointName: 'rams' },
      {
        name: 'Graphic cards',
        secondLevelMenu: [
          { name: 'Nvidia', filterParams: { page: 1, title: 'nvidia' } },
          { name: 'AMD', filterParams: { page: 1, title: 'amd' } },
        ],
        endpointName: 'graphics',
      },
      { name: 'Motherboards', endpointName: 'motherboards' },
      {
        name: 'Hard drives',
        secondLevelMenu: [
          { name: 'SSD', filterParams: { page: 1, storageType: 'SSD' } },
          { name: 'HDD', filterParams: { page: 1, storageType: 'HDD' } },
        ],
        endpointName: 'drives',
      },
      { name: 'Power supply', endpointName: 'power-supplies' },
      { name: 'Cases', endpointName: 'cases' },
    ],
    endpointName: 'processors',
  },
  {
    name: 'Peripherals',
    iconName: 'print-outline',
    firstLevelMenu: [
      { name: 'Monitors', endpointName: 'monitors' },
      { name: 'Computer mouse', endpointName: 'mouses' },
      { name: 'Computer keyboard', endpointName: 'keyboards' },
    ],
    endpointName: 'monitors',
  },
];
