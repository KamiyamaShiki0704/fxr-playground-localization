import fs from 'node:fs'
import path from 'node:path'
import yaml from 'yaml'

const LOCALES_DIR = path.join(process.cwd(), 'locales')
const DEFAULT_LOCALE = 'en-US.yml'

function flatten(obj: any, prefix = ''): Record<string, string> {
  const out: Record<string, string> = {}

  for (const [key, value] of Object.entries(obj)) {
    const flatKey = prefix ? `${prefix}.${key}` : key

    if (value && typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(out, flatten(value, flatKey))
    } else {
      out[flatKey] = value as any
    }
  }

  return out
}

function loadLocaleFile(filename: string) {
  const content = fs.readFileSync(path.join(LOCALES_DIR, filename), 'utf8')
  const locale = yaml.parse(content)
  delete locale.locale // Remove locale settings. They may include keys not in the default locale.
  return locale
}

function main() {
  const base = flatten(loadLocaleFile(DEFAULT_LOCALE))
  const files = fs.readdirSync(LOCALES_DIR).filter(f => f.endsWith('.yml') && f !== DEFAULT_LOCALE)

  let hadInvalidYaml = false

  for (const file of files) {
    let parsed: any
    try {
      parsed = loadLocaleFile(file)
    } catch (err) {
      console.error(`❌ Invalid YAML in ${file}:`, err)
      hadInvalidYaml = true
      continue
    }

    const flat = flatten(parsed)

    const unknown = Object.keys(flat).filter(k => !(k in base))
    const redundant = Object.keys(flat).filter(k => k in base && flat[k] === base[k])

    if (unknown.length === 0 && redundant.length === 0) continue

    console.warn(`\n⚠️  Issues in ${file}:`)

    if (unknown.length > 0) {
      console.warn(`   Unknown keys:`)
      for (const k of unknown) console.warn(`     - ${k}`)
    }

    if (redundant.length > 0) {
      console.warn(`   Redundant keys (same as fallback):`)
      for (const k of redundant) console.warn(`     - ${k}`)
    }
  }

  if (hadInvalidYaml) process.exit(1)
}

main()
