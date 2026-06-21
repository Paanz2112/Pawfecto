export const isElectron = () => {
  return typeof window !== 'undefined' && window.electronAPI !== undefined;
};

export const isTauri = () => {
  return typeof window !== 'undefined' && window.__TAURI__ !== undefined;
};

export const isDesktop = () => {
  return isElectron() || isTauri();
};

export const selectStorageDirectory = async () => {
  if (isElectron()) {
    return await window.electronAPI.selectDirectory();
  }
  if (isTauri()) {
    try {
      const { open } = await import('@tauri-apps/api/dialog');
      const selected = await open({
        directory: true,
        multiple: false
      });
      return selected;
    } catch (err) {
      console.error('Tauri selectDirectory error:', err);
    }
  }
  return null;
};

export const writeDesktopDataFile = async (dirPath, data) => {
  const filename = 'pawfecto_data.json';
  const dataStr = JSON.stringify(data, null, 2);
  
  if (isElectron()) {
    const filePath = `${dirPath}/${filename}`;
    return await window.electronAPI.writeFile(filePath, dataStr);
  }
  
  if (isTauri()) {
    try {
      const { writeTextFile } = await import('@tauri-apps/api/fs');
      const { join } = await import('@tauri-apps/api/path');
      const filePath = await join(dirPath, filename);
      await writeTextFile(filePath, dataStr);
      return true;
    } catch (err) {
      console.error('Tauri write file error:', err);
    }
  }
  return false;
};

export const readDesktopDataFile = async (dirPath) => {
  const filename = 'pawfecto_data.json';
  
  if (isElectron()) {
    const filePath = `${dirPath}/${filename}`;
    const content = await window.electronAPI.readFile(filePath);
    return content ? JSON.parse(content) : null;
  }
  
  if (isTauri()) {
    try {
      const { readTextFile } = await import('@tauri-apps/api/fs');
      const { join } = await import('@tauri-apps/api/path');
      const filePath = await join(dirPath, filename);
      const content = await readTextFile(filePath);
      return content ? JSON.parse(content) : null;
    } catch (err) {
      console.error('Tauri read file error:', err);
    }
  }
  return null;
};
