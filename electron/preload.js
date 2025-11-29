import { contextBridge } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  // add secure APIs later
});
