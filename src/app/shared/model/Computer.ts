import {
  Case,
  GraphicCard,
  Motherboard,
  PowerSupply,
  Processor,
  Ram,
} from './BaseProduct';

export interface Computer {
  motherboard: Motherboard;
  processor: Processor;
  ram: Ram;
  powerSupply: PowerSupply;
  graphicCard: GraphicCard;
  case: Case;
}
