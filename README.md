# Kanban Board

Et simpelt Kanban-board bygget med **Vue 3 + TypeScript** og **Vuetify 3**.  
Brugeren kan tilføje, redigere, flytte og slette kort mellem forskellige kolonner: *backlog, doing, review, done*

---

## Funktioner
- Tilføj kort med titel og beskrivelse  
- Validering (titel påkrævet, maks 200 tegn i beskrivelse)  
- Rediger eksisterende kort via dialog  
- Slet kort  
- Træk og slip for at flytte kort mellem kolonner  

---

## Teknologier
- [Vue 3](https://vuejs.org/) (Composition API)  
- [TypeScript](https://www.typescriptlang.org/) – brugt mest med type inference 
- [Vuetify 3](https://next.vuetifyjs.com/) (Material Design komponenter - herunder Carditem og column)  
- [Vitest] - til at teste funktionalitet 

---

## Installation

Klon projektet:
```bash
git clone https://github.com/dit-brugernavn/kanban-board.git
```

Installer dependencies:
```bash
npm install
```

og
```bash
npm i vuetify @mdi/font
```

Start server (udvikling)
```bash
npm run dev
```

