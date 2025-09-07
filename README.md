# Floor Plan App

<p align="center">
  <img src="https://img.shields.io/badge/React-18-61dafb?logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-5-646cff?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/License-MIT-green" alt="MIT" />
</p>

A clean, provider-based modal system. Components never render modal HTML; they only pass content to a centralized modal provider via a simple hook.

- No modal HTML in feature components
- Open/close/update any modal by id
- Open a modal from another modal
- Close individual modals precisely by id
- Drop-in via a single Provider at app bootstrap

## Table of Contents

- Demo (Concept)
- Key Features
- Architecture
- Quick Start
- API (useModal, ModalProvider)
- Usage Examples
- Project Structure
- Development

## Demo (Concept)

This repo includes a floor plan demo:

- `RoomDetailsModal` opens `ReserveRoomModal` or `CancelReservationModal`.
- `ReserveRoomModal` updates state and opens `ConfirmationModal`.
- Modals are addressed via ids like `room-101`, `reserve-101`.

## Key Features

- Strict separation of concerns: modal chrome lives in the provider only
- Minimal API: `openModal(id, content)`, `closeModal(id)`, `updateModal(id, content)`
- Reuse ids to replace content instead of stacking duplicates
- Pass any React node as content

## Architecture

- `src/context/ModalContext.tsx` – Provider with state + overlay/container rendering
- `src/hooks/useModal.ts` – Hook to access the modal API from anywhere
- Feature components – Provide content only (no overlay HTML)

Core excerpt:

```tsx
// src/context/ModalContext.tsx
export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modals, setModals] = useState<Modal[]>([]);

  const openModal = (id: string, content: ReactNode) => {
    setModals((prev) => {
      const exists = prev.some((m) => m.id === id);
      return exists
        ? prev.map((m) => (m.id === id ? { ...m, content } : m))
        : [...prev, { id, content }];
    });
  };

  const closeModal = (id: string) => {
    setModals((prev) => prev.filter((m) => m.id !== id));
  };

  const updateModal = (id: string, content: ReactNode) => {
    setModals((prev) => prev.map((m) => (m.id === id ? { ...m, content } : m)));
  };

  return (
    <ModalContext.Provider value={{ modals, openModal, closeModal, updateModal }}>
      {children}
      {modals.map((modal) => (
        <div key={modal.id} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-gray-900 text-white rounded-lg shadow-lg p-6 w-[400px] relative">
            <button onClick={() => closeModal(modal.id)} className="absolute top-2 right-2 text-gray-400 hover:text-white">✕</button>
            {modal.content}
          </div>
        </div>
      ))}
    </ModalContext.Provider>
  );
};
```

## Quick Start

```bash
npm install
npm run dev
```

Wrap your app:

```tsx
// src/App.tsx
import { ModalProvider } from './context/ModalContext';

function App() {
  return (
    <ModalProvider>
      {/* your app */}
    </ModalProvider>
  );
}
```

Use the hook:

```tsx
import { useModal } from './hooks/useModal';
const { openModal, closeModal, updateModal } = useModal();
```

## Usage Examples

Open a modal from a component:

```tsx
openModal(
  `room-${room.id}`,
  <RoomDetailsModal room={room} setRooms={setRooms} />
);
```

Open a modal from another modal:

```tsx
openModal(
  `reserve-${room.id}`,
  <ReserveRoomModal room={room} setRooms={setRooms} />
);
```

Close an individual modal:

```tsx
closeModal(`room-${room.id}`);
```

Update open modal content:

```tsx
updateModal(
  `room-${room.id}`,
  <RoomDetailsModal room={{ ...room, status: 'Booked' }} setRooms={setRooms} />
);
```

## Project Structure

```
src/
  components/
  context/
  hooks/
  modals/
  data/
```

## Development

- Start: `npm run dev`
- Type-check: `npx tsc --noEmit`
- Build: `npm run build`
