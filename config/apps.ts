import { 
  Bot, Chrome, FolderOpen, Image as ImageIcon, Terminal, FileText, Activity, Camera, 
  Palette, Gamepad2, Settings, Calculator, CloudRain, Calendar, Mail, Map, Users, 
  MessageSquare, Phone, Mic, ShoppingBag, CheckSquare, Edit, Film, Radio, Video, 
  Wifi, Shield, Scan, FileCode, Music, Eye
} from 'lucide-react';
import { AppDefinition } from '../types';

// Apps
import { AssistantApp } from '../apps/Assistant';
import { BrowserApp } from '../apps/Browser';
import { FileExplorerApp } from '../apps/FileExplorer';
import { PhotosApp } from '../apps/Photos';
import { TerminalApp } from '../apps/Terminal';
import { NotepadApp } from '../apps/NotePad';
import { TaskManagerApp } from '../apps/TaskManager';
import { CameraApp } from '../apps/Camera';
import { PaintApp } from '../apps/Paint';
import { GamesApp } from '../apps/Games';
import { SettingsApp } from '../apps/Settings';
import { CalculatorApp } from '../apps/Calculator';
import { WeatherApp } from '../apps/Weather';
import { CalendarApp } from '../apps/Calendar';
import { MailApp } from '../apps/Mail';
import { MapsApp } from '../apps/Maps';
import { ContactsApp } from '../apps/Contacts';
import { MessagesApp } from '../apps/Messages';
import { PhoneApp } from '../apps/Phone';
import { RecorderApp } from '../apps/Recorder';
import { StoreApp } from '../apps/Store';
import { TodoApp } from '../apps/Todo';
import { ImageEditorApp } from '../apps/ImageEditor';
import { ImageViewerApp } from '../apps/ImageViewer';
import { PDFReaderApp } from '../apps/PDFReader';
import { ScannerApp } from '../apps/Scanner';
import { SoundEditorApp } from '../apps/SoundEditor';
import { VideoEditorApp } from '../apps/VideoEditor';
import { VPNApp } from '../apps/VPNManager';
import { WiFiAnalyzerApp } from '../apps/WiFiAnalyzer';
import { MediaPlayerApp } from '../apps/MediaPlayer';

export const APPS: Record<string, AppDefinition> = {
  assistant: { id: 'assistant', name: 'Assistant', icon: Bot, component: AssistantApp },
  browser: { id: 'browser', name: 'Browser', icon: Chrome, component: BrowserApp },
  calculator: { id: 'calculator', name: 'Calculator', icon: Calculator, component: CalculatorApp },
  calendar: { id: 'calendar', name: 'Calendar', icon: Calendar, component: CalendarApp },
  camera: { id: 'camera', name: 'Camera', icon: Camera, component: CameraApp },
  contacts: { id: 'contacts', name: 'Contacts', icon: Users, component: ContactsApp },
  explorer: { id: 'explorer', name: 'Files', icon: FolderOpen, component: FileExplorerApp },
  games: { id: 'games', name: 'Games', icon: Gamepad2, component: GamesApp },
  imagedit: { id: 'imagedit', name: 'Image Editor', icon: Edit, component: ImageEditorApp },
  imgview: { id: 'imgview', name: 'Image Viewer', icon: Eye, component: ImageViewerApp },
  mail: { id: 'mail', name: 'Mail', icon: Mail, component: MailApp },
  maps: { id: 'maps', name: 'Maps', icon: Map, component: MapsApp },
  media: { id: 'media', name: 'Media Player', icon: Video, component: MediaPlayerApp },
  messages: { id: 'messages', name: 'Messages', icon: MessageSquare, component: MessagesApp },
  notepad: { id: 'notepad', name: 'Notes', icon: FileText, component: NotepadApp },
  paint: { id: 'paint', name: 'Paint', icon: Palette, component: PaintApp },
  pdf: { id: 'pdf', name: 'PDF Reader', icon: FileCode, component: PDFReaderApp },
  phone: { id: 'phone', name: 'Phone', icon: Phone, component: PhoneApp },
  photos: { id: 'photos', name: 'Photos', icon: ImageIcon, component: PhotosApp },
  recorder: { id: 'recorder', name: 'Recorder', icon: Mic, component: RecorderApp },
  scanner: { id: 'scanner', name: 'Scanner', icon: Scan, component: ScannerApp },
  settings: { id: 'settings', name: 'Settings', icon: Settings, component: SettingsApp },
  sound: { id: 'sound', name: 'Sound Editor', icon: Music, component: SoundEditorApp },
  store: { id: 'store', name: 'Store', icon: ShoppingBag, component: StoreApp },
  taskmanager: { id: 'taskmanager', name: 'Task Mgr', icon: Activity, component: TaskManagerApp },
  terminal: { id: 'terminal', name: 'Terminal', icon: Terminal, component: TerminalApp },
  todo: { id: 'todo', name: 'Tasks', icon: CheckSquare, component: TodoApp },
  videoedit: { id: 'videoedit', name: 'Video Editor', icon: Film, component: VideoEditorApp },
  vpn: { id: 'vpn', name: 'VPN', icon: Shield, component: VPNApp },
  weather: { id: 'weather', name: 'Weather', icon: CloudRain, component: WeatherApp },
  wifi: { id: 'wifi', name: 'WiFi Analyzer', icon: Wifi, component: WiFiAnalyzerApp },
};