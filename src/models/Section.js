const schema = {
  mainTitle: (mainTitle) => mainTitle,
  subTitle: (subTitle) => subTitle,
  description: (description) => description,
  image: (image) => image,
  backgroundColour: (backgroundColour) => backgroundColour,
  textColour: (textColour) => textColour,
  classStyle: (classStyle) => classStyle,
  type: (type) => type,
  section: (section) => section,
  sectionReference: (sectionReference) => sectionReference,
  bannerReference: (bannerReference) => bannerReference,
  handle: (handle) => handle,
  ctaText: (ctaText) => ctaText,
  ctaUrl: (ctaUrl) => ctaUrl,
  ctaLink: (ctaLink) => ctaLink,
  footerText: (footerText) => footerText,
  headerText: (headerText) => headerText,
  ctaMobText: (ctaMobText) => ctaMobText,
  id: (id) => id,
}
const parse = (section) => {
  let _section = {}
  Object.keys(section).map((key) => {
    if (schema[key])
      _section[key] = schema[key] ? schema[key](section[key]) : section[key]
  })
  return _section
}

export default parse
