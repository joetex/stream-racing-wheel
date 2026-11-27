# Stream a Racing Wheel gamepad overlay on PC

Don't have 3 cameras to be showing wheel and pedals? This react application lets you connect to your G920 Racing Wheel or any steering wheel gamepad and show a visual representation of the controls as an overlay.

**Customize the wheel, pedals and shifter images to create any appearance you want.**


### Use Online

[https://joetex.github.io/stream-racing-wheel/](https://joetex.github.io/stream-racing-wheel/)

### Watch Example Preview

**Forza Horizon 4**

`BAC Mono`
https://user-images.githubusercontent.com/1610876/224411414-92476ddf-6fa9-40e1-938e-158baf2ce41e.mp4


`Ford Raptor` 
https://user-images.githubusercontent.com/1610876/224411440-c15f0a53-c205-42a8-ab70-b5a9603209c8.mp4




### Install and use locally

Requirements:
- Node 20.19+ or 22.12+

#### `npm install`

#### `npm start`

Runs the app in development mode with [Vite](https://vite.dev).<br />
Open [http://localhost:3000/stream-racing-wheel/](http://localhost:3000/stream-racing-wheel/) to view it in the browser.

#### `npm run build`

Builds the app for production into the `build` folder.

#### `npm run deploy`

Builds and publishes the `build` folder to GitHub Pages.

### Troubleshooting

**Controller doesn't show up in the list:** browsers only report a controller after you press a button on it while the page is focused. If it still doesn't appear, fully quit Steam (or turn off Steam Input for Xbox controllers) and fully restart your browser.



### Change Log
>**November 27, 2026**
>- Fixed controllers not appearing in the Controller Gamepad list when the browser's connect event was missed
>- Fixed selecting a controller from the dropdown (it previously threw an error and never switched)
>- Fixed duplicate input loops when switching controllers, and a crash when the selected controller disconnects
>- Fixed the Logitech G920 wheel overlapping the pedals
>- Fixed the Live Input Monitor axis bars lagging behind the actual input
>- Fixed the page crashing when a profile binds an input the connected controller doesn't have
>- Switched the build from Create React App to Vite, which clears all `npm audit` vulnerabilities
>- Removed unused dependencies (`react-gamepad`, `@testing-library/*`)

>**November 27, 2026** — MOZA presets and UI redesign ([#17](https://github.com/joetex/stream-racing-wheel/pull/17))
>- Added MOZA Racing bundle presets (R3/R5 ES, CS V2, KS GT) alongside the Logitech G920
>- Added a catalog of 19 MOZA wheels plus MOZA pedal and shifter images
>- New sidebar layout with Show Pedals / Show Shifter toggles
>- Added OBS URL mode: **Copy OBS URL** generates a link with a transparent background and your settings (profile, wheel, rotation, button masks, pedals, shifter)
>- Redesigned keybind editor with tabs and a live input monitor

>**May 6, 2025**
>- Added Save/Delete buttons to edit selected profile 
>- Added Cancel button for create profile panel

>**November 26, 2023**
>- All images URLs now saved into localStorage to avoid having to reenter each time.

>**March 10, 2023**
>- Added Invert toggle configuration for Wheel and Pedals

>**September 16, 2022**
>- Wheel Button Presses are now visible through a button mask that can be customized.

>**September 1, 2022**
>- You can now bind the inputs to work with any steering wheel.  You can also change the images to anything you want. Just scroll to bottom of page.
>- Added Input Re-Binding
>- Added ability to use Custom Images
