import './style.css'
import { h } from "../lib/main";

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div id="container">
  </div>
`

const input = h("input",
  {
    class: "x-input",
    style: {
      width: "200px",
      height: "30px",
    },
    onInput: (e: Event) => console.log((e.target as HTMLInputElement).value)
  })

if (input) {
  document.querySelector("#container")?.appendChild(input);
}

