import type { GlobalConfig } from 'payload'

const CONTENT_KEYS = ['seo', 'header', 'hero', 'services', 'process', 'results', 'cta', 'footer'] as const

type Row = Record<string, unknown>

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function stripId<T extends Row>(row: T): Omit<T, 'id'> {
  const { id, ...rest } = row
  return rest
}

function cleanRows(rows: unknown): Row[] {
  if (!Array.isArray(rows)) return []
  return rows.filter(isObject).map(stripId)
}

function toStringList(rows: unknown): string[] {
  if (!Array.isArray(rows)) return []
  return rows
    .map((row) => (isObject(row) ? row.value : row))
    .filter((value): value is string => typeof value === 'string' && value.trim().length > 0)
}

function toTextRows(values: unknown): Array<{ value: string }> {
  if (!Array.isArray(values)) return []
  return values
    .filter((value): value is string => typeof value === 'string' && value.trim().length > 0)
    .map((value) => ({ value }))
}

function buildDataFromFields(data: Record<string, unknown>, originalDoc: Record<string, unknown> | undefined) {
  const currentData = isObject(data.data)
    ? data.data
    : isObject(originalDoc?.data)
      ? (originalDoc?.data as Record<string, unknown>)
      : {}

  const nextData: Record<string, unknown> = { ...currentData }

  for (const key of CONTENT_KEYS) {
    if (key in data) {
      nextData[key] = data[key]
    }
  }

  const process = isObject(nextData.process) ? { ...nextData.process } : undefined
  if (process && Array.isArray(process.steps)) {
    process.steps = cleanRows(process.steps).map((step) => ({
      ...step,
      details: toStringList((step as Record<string, unknown>).details),
    }))
    nextData.process = process
  }

  const results = isObject(nextData.results) ? { ...nextData.results } : undefined
  if (results && Array.isArray(results.caseStudies)) {
    results.caseStudies = cleanRows(results.caseStudies).map((study) => ({
      ...study,
      tags: toStringList((study as Record<string, unknown>).tags),
    }))
    nextData.results = results
  }

  const cta = isObject(nextData.cta) ? { ...nextData.cta } : undefined
  if (cta) {
    cta.checklist = toStringList(cta.checklist)
    nextData.cta = cta
  }

  if (isObject(nextData.header) && Array.isArray((nextData.header as Record<string, unknown>).navLinks)) {
    ;(nextData.header as Record<string, unknown>).navLinks = cleanRows((nextData.header as Record<string, unknown>).navLinks)
  }

  if (isObject(nextData.hero)) {
    const hero = nextData.hero as Record<string, unknown>
    if (isObject(hero.primaryCta)) hero.primaryCta = stripId(hero.primaryCta)
    if (isObject(hero.secondaryCta)) hero.secondaryCta = stripId(hero.secondaryCta)
    if (Array.isArray(hero.stats)) hero.stats = cleanRows(hero.stats)
  }

  if (isObject(nextData.services) && Array.isArray((nextData.services as Record<string, unknown>).items)) {
    ;(nextData.services as Record<string, unknown>).items = cleanRows((nextData.services as Record<string, unknown>).items)
  }

  if (process && Array.isArray(process.steps)) {
    process.steps = cleanRows(process.steps)
    nextData.process = process
  }

  if (results) {
    if (Array.isArray(results.metrics)) results.metrics = cleanRows(results.metrics)
    if (Array.isArray(results.caseStudies)) results.caseStudies = cleanRows(results.caseStudies)
    nextData.results = results
  }

  if (cta && isObject(cta.form)) {
    cta.form = stripId(cta.form)
    nextData.cta = cta
  }

  if (isObject(nextData.footer) && Array.isArray((nextData.footer as Record<string, unknown>).groups)) {
    ;(nextData.footer as Record<string, unknown>).groups = cleanRows((nextData.footer as Record<string, unknown>).groups).map((group) => ({
      ...group,
      links: cleanRows((group as Record<string, unknown>).links),
    }))
  }

  return nextData
}

function hydrateFieldsFromData(doc: Record<string, unknown>) {
  if (!isObject(doc.data)) return doc

  const data = doc.data
  const hydrated: Record<string, unknown> = { ...doc, ...data }

  const process = isObject(hydrated.process) ? { ...hydrated.process } : undefined
  if (process && Array.isArray(process.steps)) {
    process.steps = cleanRows(process.steps).map((step) => ({
      ...step,
      details: toTextRows((step as Record<string, unknown>).details),
    }))
    hydrated.process = process
  }

  const results = isObject(hydrated.results) ? { ...hydrated.results } : undefined
  if (results && Array.isArray(results.caseStudies)) {
    results.caseStudies = cleanRows(results.caseStudies).map((study) => ({
      ...study,
      tags: toTextRows((study as Record<string, unknown>).tags),
    }))
    hydrated.results = results
  }

  const cta = isObject(hydrated.cta) ? { ...hydrated.cta } : undefined
  if (cta) {
    cta.checklist = toTextRows(cta.checklist)
    hydrated.cta = cta
  }

  return hydrated
}

export const SiteContent: GlobalConfig = {
  slug: 'site-content',
  label: 'Site Content',
  access: {
    read: () => true,
  },
  hooks: {
    beforeChange: [
      ({ data, originalDoc }) => {
        if (!isObject(data)) return data
        return {
          ...data,
          data: buildDataFromFields(data, isObject(originalDoc) ? originalDoc : undefined),
        }
      },
    ],
    afterRead: [
      ({ doc }) => {
        if (!isObject(doc)) return doc
        return hydrateFieldsFromData(doc)
      },
    ],
  },
  fields: [
    {
      name: 'data',
      type: 'json',
      required: false,
      admin: {
        hidden: true,
      },
      defaultValue: {
        seo: {
          title: 'Rank Vision SEO - AI-Powered SEO Agency',
          description: 'Default description',
          jsonLd: { '@context': 'https://schema.org', '@type': 'ProfessionalService' },
        },
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'SEO',
          fields: [
            { name: 'seo', type: 'group', fields: [
              { name: 'title', type: 'text', required: false },
              { name: 'description', type: 'textarea', required: false },
              { name: 'jsonLd', type: 'json' },
            ]},
          ],
        },
        {
          label: 'Header',
          fields: [
            { name: 'header', type: 'group', fields: [
              { name: 'ctaLabel', type: 'text', required: false },
              { name: 'navLinks', type: 'array', fields: [
                { name: 'label', type: 'text', required: false },
                { name: 'href', type: 'text', required: false },
              ] },
            ]},
          ],
        },
        {
          label: 'Hero',
          fields: [
            { name: 'hero', type: 'group', fields: [
              { name: 'badge', type: 'text' },
              { name: 'headingLine1', type: 'text', required: false },
              { name: 'headingHighlight', type: 'text', required: false },
              { name: 'headingLine2', type: 'text', required: false },
              { name: 'description', type: 'textarea', required: false },
              { name: 'primaryCta', type: 'group', fields: [
                { name: 'label', type: 'text', required: false },
                { name: 'href', type: 'text', required: false },
              ] },
              { name: 'secondaryCta', type: 'group', fields: [
                { name: 'label', type: 'text', required: false },
                { name: 'href', type: 'text', required: false },
              ] },
              { name: 'stats', type: 'array', fields: [
                { name: 'value', type: 'text', required: false },
                { name: 'label', type: 'text', required: false },
              ] },
            ]},
          ],
        },
        {
          label: 'Services',
          fields: [
            { name: 'services', type: 'group', fields: [
              { name: 'eyebrow', type: 'text' },
              { name: 'headingLine1', type: 'text', required: false },
              { name: 'headingLine2', type: 'text', required: false },
              { name: 'description', type: 'textarea', required: false },
              { name: 'items', type: 'array', fields: [
                { name: 'title', type: 'text', required: false },
                { name: 'description', type: 'textarea', required: false },
                { name: 'icon', type: 'text', required: false },
                { name: 'tag', type: 'text', required: false },
              ] },
            ]},
          ],
        },
        {
          label: 'Process',
          fields: [
            { name: 'process', type: 'group', fields: [
              { name: 'eyebrow', type: 'text' },
              { name: 'headingLine1', type: 'text', required: false },
              { name: 'headingLine2', type: 'text', required: false },
              { name: 'steps', type: 'array', fields: [
                { name: 'number', type: 'text', required: false },
                { name: 'title', type: 'text', required: false },
                { name: 'description', type: 'textarea', required: false },
                { name: 'details', type: 'array', fields: [
                  { name: 'value', type: 'text', required: false },
                ] },
              ] },
            ]},
          ],
        },
        {
          label: 'Results',
          fields: [
            { name: 'results', type: 'group', fields: [
              { name: 'eyebrow', type: 'text' },
              { name: 'headingLine1', type: 'text', required: false },
              { name: 'headingLine2', type: 'text', required: false },
              { name: 'metrics', type: 'array', fields: [
                { name: 'value', type: 'text', required: false },
                { name: 'label', type: 'text', required: false },
                { name: 'description', type: 'textarea', required: false },
              ] },
              { name: 'caseStudies', type: 'array', fields: [
                { name: 'industry', type: 'text', required: false },
                { name: 'metric', type: 'text', required: false },
                { name: 'timeframe', type: 'text', required: false },
                { name: 'description', type: 'textarea', required: false },
                { name: 'tags', type: 'array', fields: [
                  { name: 'value', type: 'text', required: false },
                ] },
              ] },
            ]},
          ],
        },
        {
          label: 'CTA',
          fields: [
            { name: 'cta', type: 'group', fields: [
              { name: 'badge', type: 'text' },
              { name: 'headingLine1', type: 'text', required: false },
              { name: 'headingLine2', type: 'text', required: false },
              { name: 'description', type: 'textarea', required: false },
              { name: 'checklist', type: 'array', fields: [
                { name: 'value', type: 'text', required: false },
              ] },
              { name: 'form', type: 'group', fields: [
                { name: 'nameLabel', type: 'text', required: false },
                { name: 'emailLabel', type: 'text', required: false },
                { name: 'websiteLabel', type: 'text', required: false },
                { name: 'messageLabel', type: 'text', required: false },
                { name: 'submitLabel', type: 'text', required: false },
                { name: 'footnote', type: 'textarea', required: false },
              ] },
            ]},
          ],
        },
        {
          label: 'Footer',
          fields: [
            { name: 'footer', type: 'group', fields: [
              { name: 'description', type: 'textarea', required: false },
              { name: 'status', type: 'text', required: false },
              { name: 'groups', type: 'array', fields: [
                { name: 'heading', type: 'text', required: false },
                { name: 'links', type: 'array', fields: [
                  { name: 'label', type: 'text', required: false },
                  { name: 'href', type: 'text', required: false },
                ] },
              ] },
            ]},
          ],
        },
      ],
    },
  ],
}

