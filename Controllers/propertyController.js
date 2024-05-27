const property = require('../Models/propertyModel')


exports.addProperty = async (req, res) => {
  const { name, place, rent, bedroom, bathroom, hospital, college } = req.body
  const image = req.file.filename
  const userId = req.payload

  try {
    const result = await property.findOne({ name })
    if (result) {
      res.status(401), json("project already exist")
    } else {
      const newProperty = new property({
        name, place, rent, bedroom, bathroom, hospital, college, image, userId
      })
      await newProperty.save()
      res.status(200).json(newProperty)
    }
  } catch (err) {
    res.status(406).json(err)
  }
}


exports.getProperty = async (req, res) => {

  try {
    const result = await property.find()
    if (result) {
      res.status(200).json(result)

    } else {
      res.status(401).json("No projects")
    }
  } catch (err) {
    res.status(406).json(err)
  }
}

exports.getOtherProperty = async (req, res) => {
  const user = req.payload

  try {
    const result = await property.find({ userId: { "$not": { "$eq": user } } })

    if (result) {
      res.status(200).json(result)

    } else {
      res.status(401).json("No projects")
    }
  } catch (err) {
    res.status(406).json(err)
  }
}


exports.userProperty = async (req, res) => {
  const userId = req.payload
  try {
    const result = await property.find({ userId })
    if (result) {
      res.status(200).json(result)

    } else {
      res.status(401).json("No projects")
    }
  } catch (err) {
    res.status(406).json(err)
  }
}

exports.editProperty = async (req, res) => {
  const userId = req.payload
  const { pid } = req.params
  const { name, place, rent, bedroom, bathroom, hospital, college } = req.body
  const image = req.file ? req.file.filename : req.body.image
  try {
    const result = await property.findByIdAndUpdate({ _id: pid }, { name, place, rent, bedroom, bathroom, hospital, college, userId }, { new: true })
    await result.save()
    res.status(200).json(result)
  } catch (err) {
    res.status(406).json(err)
  }
}

exports.removeProperty = async (req, res) => {
  const { pid } = req.params
  try {
    const result = await property.findByIdAndDelete({ _id: pid })
    res.status(200).json(result)
  } catch (err) {
    res.status(406).json(err)
  }
}

exports.like = async (req, res) => {
  const userId = req.payload

  const { propertyId } = req.body
  try {
    const result = await property.findById(propertyId);
    result.likes += 1;
    await result.save()
    res.status(200).json(result)
  } catch (err) {
    res.status(406).json(err)
  }
}