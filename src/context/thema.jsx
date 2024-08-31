// import { createContext, useState } from "react";

// expect const ThemeContext = createContext

// export const ThemeProvider = ({children}) = {
//     const [theme, setTheme] = useState('light')

//     function changeTheme () {
//         setTheme(previewState => previewState === 'light' ? 'dark' : 'light')
//     }
//     return(
        
//     )
// }



import { create } from 'zustand'
const useStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears) => set({ bears: newBears }),
}))