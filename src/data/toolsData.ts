import { ToolItemProps } from '../components/ToolCard/ToolCard';

export interface SectionCategory {
  id: string;
  name: string;
  color: string;
}

export interface SectionData {
  title: string;
  bgColor: string;
  categories: SectionCategory[];
  tools: Record<string, ToolItemProps[]>;
}

export const appData: Record<string, SectionData> = {
  ALL: {
    title: '◎ ALL TOOLS',
    bgColor: '#FF4D4D',
    categories: [
      { id: 'top', name: 'TOP RATED', color: '#FF4D4D' },
      { id: 'new', name: 'NEW ARRIVALS', color: '#4DFFB8' },
    ],
    tools: {
      top: [
        { id: 't1', title: 'ChatGPT', description: 'The most popular conversational AI model.', url: 'https://chat.openai.com' },
        { id: 't2', title: 'Figma', description: 'Collaborative interface design tool.', url: 'https://figma.com' },
      ],
      new: [],
    }
  },
  AI: {
    title: '⊕ AI TOOLS',
    bgColor: '#4DFFB8',
    categories: [
      { id: 'text', name: 'TEXT & WRITING', color: '#4DFFB8' },
      { id: 'image', name: 'IMAGE & PHOTO', color: '#FFA64D' },
    ],
    tools: {
      text: [
        { id: 'ai1', title: 'ChatGPT', description: 'The most popular conversational AI model by OpenAI.', url: 'https://chat.openai.com' },
        { id: 'ai2', title: 'Claude', description: 'Advanced AI assistant by Anthropic.', url: 'https://claude.ai' },
      ],
      image: [
        { id: 'ai3', title: 'Midjourney', description: 'Incredible AI image generator.', url: 'https://midjourney.com' },
      ],
    }
  },
  DEV: {
    title: '© DEV TOOLS',
    bgColor: '#7A4DFF',
    categories: [
      { id: 'frontend', name: 'FRONTEND', color: '#2BD2FF' },
      { id: 'backend', name: 'BACKEND', color: '#7A4DFF' },
    ],
    tools: {
      frontend: [
        { id: 'dev1', title: 'React', description: 'The library for web and native user interfaces.', url: 'https://react.dev' },
        { id: 'dev2', title: 'Zustand', description: 'Bear necessities for state management in React.', url: 'https://zustand-demo.pmnd.rs' },
      ],
      backend: [
        { id: 'dev3', title: 'Node.js', description: 'JavaScript runtime built on Chrome V8 JavaScript engine.', url: 'https://nodejs.org' },
      ],
    }
  },
  DESIGN: {
    title: '▣ DESIGN',
    bgColor: '#FFA64D',
    categories: [
      { id: 'ui', name: 'UI & UX', color: '#FFA64D' },
      { id: 'colors', name: 'COLORS & FONTS', color: '#FF4DF0' },
    ],
    tools: {
      ui: [
        { id: 'des1', title: 'Figma', description: 'Collaborative interface design tool.', url: 'https://figma.com' },
      ],
      colors: [
        { id: 'des2', title: 'Coolors', description: 'The super fast color palettes generator!', url: 'https://coolors.co' },
      ],
    }
  },
  FILES: {
    title: '⊞ FILES',
    bgColor: '#FFFF4D',
    categories: [
      { id: 'storage', name: 'CLOUD STORAGE', color: '#2BD2FF' },
      { id: 'convert', name: 'CONVERTERS', color: '#FFFF4D' },
    ],
    tools: {
      storage: [
        { id: 'fil1', title: 'Google Drive', description: 'Personal cloud storage & file sharing platform.', url: 'https://drive.google.com' },
      ],
      convert: [
        { id: 'fil2', title: 'CloudConvert', description: 'File converter supporting 200+ formats.', url: 'https://cloudconvert.com' },
      ],
    }
  },
  GAMES: {
    title: '◇ GAMES',
    bgColor: '#FF4DF0',
    categories: [
      { id: 'engines', name: 'GAME ENGINES', color: '#FF4DF0' },
      { id: 'assets', name: 'ASSETS & 3D', color: '#4DFFB8' },
    ],
    tools: {
      engines: [
        { id: 'gam1', title: 'Unreal Engine 5', description: 'The most powerful real-time 3D creation tool.', url: 'https://www.unrealengine.com' },
        { id: 'gam2', title: 'Roblox Studio', description: 'Create anything. Reach millions of players.', url: 'https://create.roblox.com' },
      ],
      assets: [
        { id: 'gam3', title: 'Kenney', description: 'Free game assets for your projects.', url: 'https://kenney.nl' },
        { id: 'gam4', title: 'Blender', description: 'Free and open 3D creation suite.', url: 'https://www.blender.org' },
      ],
    }
  }
};