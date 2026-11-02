import { VideoShowcase } from '../types/store';

// Thumbnails from our assets
import projectorImg from '../assets/images/product_laser_projector_1792647707802.jpg';
import speakerImg from '../assets/images/product_levitating_speaker_1792647709413.jpg';
import clockImg from '../assets/images/product_cyber_desk_clock_1792647709297.jpg';
import gamingKeypadImg from '../assets/images/product_gaming_pad_1792647731030.jpg';

/**
 * Configure your video showcase items here.
 * You can provide standard MP4 video URLs or YouTube embed/watch URLs.
 * The video showcase automatically adapts to both formats.
 */
export const VIDEOS: VideoShowcase[] = [
  {
    id: 'vid-projector-demo',
    title: 'Lumina 4K Laser Cube: Unboxing & 200" Dark Room Throw',
    description: 'Watch how quickly this ultra-compact laser projector auto-calibrates against a 200-inch wall with crystal-clear 4K HDR playback and built-in Harman Kardon acoustics.',
    duration: '02:45',
    videoType: 'mp4',
    // High-reliability sample video streams (Big Buck Bunny / Blender Open Movie standard tech benchmark stream)
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnail: projectorImg,
    productId: 'gh-proj-01',
    badge: '4K Cinema Test',
  },
  {
    id: 'vid-speaker-demo',
    title: 'Aurora Sonus: Magnetic Levitation In Action',
    description: 'See the magnetic field in action as the glowing golden acoustic sphere floats and gently spins above its brushed base, delivering deep 360° omnidirectional audio.',
    duration: '01:50',
    videoType: 'mp4',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnail: speakerImg,
    productId: 'gh-spk-02',
    badge: 'Acoustic Test',
  },
  {
    id: 'vid-clock-demo',
    title: 'NixieGlow IPS Tube Clock: 20 Dial Styles & WiFi Sync',
    description: 'Demonstrating custom glass vacuum tubes with warm vintage amber digits, real-time weather integration, and precision light sensor dimming.',
    duration: '03:15',
    videoType: 'mp4',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnail: clockImg,
    productId: 'gh-clk-03',
    badge: 'Desk Setup Showcase',
  },
  {
    id: 'vid-keypad-demo',
    title: 'ApexCyber Macro Keypad: Mechanical Switch Sound Test',
    description: 'Listen to the deep lubed switch clicks, tactical rotary wheel precision, and customizable golden underglow backlighting setup.',
    duration: '02:10',
    videoType: 'mp4',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    thumbnail: gamingKeypadImg,
    productId: 'gh-gme-08',
    badge: 'Tactile Sound Test',
  },
];
