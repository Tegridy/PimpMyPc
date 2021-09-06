// Temp for building UI only

export const categories = [
  {
    name: 'Laptops',
    iconName: 'laptop-outline',
    subMenu: [
      {
        name: 'Laptops/Ultrabooks/Notebooks',
        innerMenu: [
          'Notebook/Laptop 15"',
          'Notebook/Laptop 16"',
          'Notebook/Laptop 17"',
        ],
      },
    ],
    endpointName: 'laptops',
  },
  {
    name: 'Computers',
    iconName: 'desktop-outline',
    subMenu: [{ name: 'Personal Computers' }, { name: 'Gaming Computers' }],
    endpointName: 'computers'
  },
  { name: 'Smartphones', iconName: 'phone-portrait-outline' },
  { name: 'Build PC', iconName: 'hammer-outline' },
  {
    name: 'Computer assets',
    iconName: 'hardware-chip-outline',
    subMenu: [
      { name: 'Processors', innerMenu: ['Intel', 'AMD'] },
      { name: 'Memory RAM' },
      { name: 'Graphic cards', innerMenu: ['Nvidia', 'AMD'] },
      { name: 'Motherboards' },
      { name: 'Hard drives', innerMenu: ['SSD', 'HDD'] },
      { name: 'Power supply' },
      { name: 'Cases' },
    ],
  },
  {
    name: 'Peripherals',
    iconName: 'print-outline',
    subMenu: [
      { name: 'Monitors' },
      { name: 'Computer mouse' },
      { name: 'Computer keyboard' },
    ],
  },
];
