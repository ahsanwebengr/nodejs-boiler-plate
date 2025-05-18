import httpErrors from 'http-errors';

export class DBQuery {
  model;

  constructor(model) {
    this.model = model;
  }

  async getAll() {
    return await this.model.find({});
  }

  async getById(id, fields) {
    const doc = await this.model.findById(id).select(fields);
    if (!doc) throw httpErrors(404, `${this.model.modelName} not found`);
    return doc;
  }

  async create(data) {
    return await this.model.create(data);
  }

  async update(id, data) {
    const doc = await this.model.findByIdAndUpdate(id, data, { new: true });
    if (!doc) throw httpErrors(404, `${this.model.modelName} not found`);
    return doc;
  }

  async delete(id) {
    const doc = await this.model.findByIdAndDelete(id);
    if (!doc) throw httpErrors(404, `${this.model.modelName} not found`);
    return doc;
  }

  async deleteMany(query) {
    return await this.model.deleteMany(query);
  }

  async aggregate(pipeline) {
    return await this.model.aggregate(pipeline);
  }

  async countDocuments(query) {
    return await this.model.countDocuments(query);
  }

  async findOne(query, projection = '') {
    return await this.model.findOne(query).select(projection);
  }

  async find(
    query = {},
    limit = 12,
    page = 1,
    projection = null,
    options = {}
  ) {
    limit = parseInt(limit);
    page = parseInt(page);

    const result = await this.model
      .find(query, projection, options)
      .skip((page - 1) * limit)
      .limit(limit);

    const count = await this.model.countDocuments(query);

    return {
      pages: Math.ceil(count / limit),
      total: count,
      data: result
    };
  }

  async findById(id) {
    const doc = await this.model.findById(id);
    if (!doc) throw httpErrors(404, `${this.model.modelName} not found`);
    return doc;
  }

  async findByIdAndUpdate(id, data, options = { new: true }) {
    const doc = await this.model.findByIdAndUpdate(id, data, options);
    if (!doc) throw httpErrors(404, `${this.model.modelName} not found`);
    return doc;
  }

  async findByIdAndDelete(id) {
    const doc = await this.model.findByIdAndDelete(id);
    if (!doc) throw httpErrors(404, `${this.model.modelName} not found`);
    return doc;
  }

  async updateMany(query, data) {
    return await this.model.updateMany(query, data);
  }

  async replaceOne(query, data) {
    return await this.model.replaceOne(query, data);
  }

  async findOneAndUpdate(query, update, options = { new: true }) {
    const doc = await this.model.findOneAndUpdate(query, update, options);
    if (!doc) throw httpErrors(404, `${this.model.modelName} not found`);
    return doc;
  }

  async findOneAndDelete(query) {
    const doc = await this.model.findOneAndDelete(query);
    if (!doc) throw httpErrors(404, `${this.model.modelName} not found`);
    return doc;
  }

  async findOneAndReplace(query, replacement, options = { new: true }) {
    const doc = await this.model.findOneAndReplace(query, replacement, options);
    if (!doc) throw httpErrors(404, `${this.model.modelName} not found`);
    return doc;
  }

  async findOneOrCreate(query, data) {
    return await this.model.findOneAndUpdate(query, data, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true
    });
  }

  async updateByQuery(filter, updateData) {
    const doc = await this.model.findOneAndUpdate(filter, updateData, {
      new: true
    });
    if (!doc) throw httpErrors(404, `${this.model.modelName} not found`);
    return doc;
  }
}
