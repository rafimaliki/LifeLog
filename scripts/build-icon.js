const { Resvg } = require('@resvg/resvg-js')
const fs = require('fs')
const path = require('path')

const svgPath = path.join(__dirname, '../electron/icon.svg')
const pngPath = path.join(__dirname, '../electron/icon.png')
const icoPath = path.join(__dirname, '../electron/icon.ico')

const svgContent = fs.readFileSync(svgPath, 'utf-8')

function renderPng(size) {
  const resvg = new Resvg(svgContent, { fitTo: { mode: 'width', value: size } })
  return Buffer.from(resvg.render().asPng())
}

/**
 * Build an ICO file containing PNG-compressed frames (Windows Vista+ format).
 * Each PNG is embedded as-is in the ICO container — no re-encoding needed.
 */
function buildIco(pngBuffers) {
  const count = pngBuffers.length
  const tocBytes = 6 + count * 16

  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0) // reserved
  header.writeUInt16LE(1, 2) // type: 1 = icon
  header.writeUInt16LE(count, 4)

  let dataOffset = tocBytes
  const entries = pngBuffers.map((png) => {
    const w = png.readUInt32BE(16) // from PNG IHDR
    const h = png.readUInt32BE(20)
    const entry = Buffer.alloc(16)
    entry.writeUInt8(w >= 256 ? 0 : w, 0)  // 0 means 256
    entry.writeUInt8(h >= 256 ? 0 : h, 1)
    entry.writeUInt8(0, 2)  // palette colors (0 = no palette)
    entry.writeUInt8(0, 3)  // reserved
    entry.writeUInt16LE(1, 4)  // color planes
    entry.writeUInt16LE(32, 6) // bits per pixel
    entry.writeUInt32LE(png.length, 8)
    entry.writeUInt32LE(dataOffset, 12)
    dataOffset += png.length
    return entry
  })

  return Buffer.concat([header, ...entries, ...pngBuffers])
}

function main() {
  const png256 = renderPng(256)
  fs.writeFileSync(pngPath, png256)
  console.log('✓ electron/icon.png')

  const sizes = [16, 32, 48, 64, 128, 256]
  const pngBuffers = sizes.map(renderPng)
  const ico = buildIco(pngBuffers)
  fs.writeFileSync(icoPath, ico)
  console.log('✓ electron/icon.ico')
}

main()
