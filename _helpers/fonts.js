import { Platform } from "react-native";
export const fonts = {
    default: [
        Platform.OS === 'ios' ? 'Arial' : 'sans-serif',
        'serif',
        'Cormorant' 
        ]
}