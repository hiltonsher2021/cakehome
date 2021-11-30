import Section from "./Section"

const schema = {
  title: title => title,
  handle: handle => handle,
  subTitle: subTitle => subTitle,
  description: description => description,
  sections: sections => sections.map(section => Section(section)
  )
}

const parse = (page) => {
    let _page = {};
    Object.keys(page).map(key => {
        if (schema[key])
            _page[key] = schema[key] ? schema[key](page[key]) : page[key]
    })
    return _page
}

export default parse;
