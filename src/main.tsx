import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app/App.tsx'
import { ConfigProvider, theme } from 'antd';


const updateWindowDimensions = () => {
  document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);
};
window.addEventListener('load', updateWindowDimensions);
window.addEventListener('resize', updateWindowDimensions);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
      <App />
    </ConfigProvider>
  </StrictMode>,
)
