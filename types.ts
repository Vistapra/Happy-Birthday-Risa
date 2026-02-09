export enum ScreenName {
  PRELOADER = 'PRELOADER',
  OPENING = 'OPENING',
  GREETING = 'GREETING',
  MESSAGE = 'MESSAGE',
  MEMORIES = 'MEMORIES',
  HIGHLIGHT = 'HIGHLIGHT',
  GIFT_BOX = 'GIFT_BOX',
  GIFT_REVEAL = 'GIFT_REVEAL',
  CLOSING = 'CLOSING',
}

export interface ParticleProps {
  delay: number;
  duration: number;
  left: string;
  size: number;
  color: string;
}

// --- Theme Configuration ---
export interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
  buttonStyle: string; // 'rounded', 'pill', 'square'
}

// --- Content Configuration Interfaces ---

export interface PreloaderConfig {
  backgroundColor: string;
  loaderColor: string;
  duration: number;
  icon: string;
  text: string;
  logoImage: string;
}

export interface OpeningConfig {
  titleText: string;
  subtitleText: string;
  backgroundImage: string;
  buttonText: string;
}

export interface GreetingConfig {
  heading: string;
  message: string;
  avatarImage: string;
  subTitle: string; // Keeping for compatibility or specific design needs
  badgeText: string;
  buttonText: string;
}

export interface Paragraph {
  id: string;
  text: string;
}

export interface MessageConfig {
  title: string;
  paragraphs: Paragraph[];
  signature: string;
  buttonText: string;
  topBackgroundImage?: string;
  bottomBackgroundImage?: string;
}

export interface Memory {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  icon: string;
}

export interface MemoriesConfig {
  title: string;
  subtitle: string;
  memories: Memory[];
  buttonText: string;
}

export interface HighlightItem {
  id: string;
  title: string;
  icon: string;
  color: string;
  description: string;
}

export interface HighlightConfig {
  title: string;
  location: string; // Keeping context
  caption: string;
  image: string; // Main image
  highlights: HighlightItem[]; // New array capability
}

export interface GiftBoxConfig {
  boxText: string;
  boxImage: string; // Or color/style
  hintText: string;
  skipText: string;
}

export interface GiftRevealConfig {
  revealTitle: string;
  revealMessage: string;
  giftImage: string;
  buttonText: string;
}

export interface ClosingConfig {
  closingMessage: string; // Title
  subtitle: string;
  signature: string;
  backgroundImage: string;
  buttonText: string;
}

export interface AppConfig {
  recipientName: string; // Global ref
  theme: ThemeConfig;
  screens: {
    preloader: PreloaderConfig;
    opening: OpeningConfig;
    greeting: GreetingConfig;
    message: MessageConfig;
    memories: MemoriesConfig;
    highlight: HighlightConfig;
    giftBox: GiftBoxConfig;
    giftReveal: GiftRevealConfig;
    closing: ClosingConfig;
  };
}