class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    //Basic filtering
    //Check if we have a specific query /api/v1/tours?<key>=<value>...
    //req.query will return an object containg key=value pair
    //First we need to make a copy of the object using the Object.assign or the spread operator (ES6)
    const queryObj = { ...this.queryString };
    //Then, we check the properties / keys of the queryObj and delete the said property / key from it.
    const excludedQuery = ['sort', 'limit', 'page', 'fields'];
    excludedQuery.forEach((el) => delete queryObj[el]); //delete Obj['<propertyName>'

    //Advanced filtering
    //api/v1/tours?price[gte]=500 --> mongoDB syntax for filter
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    //Sorting
    //api/v1/tours?sort=price,<propertyToSort>
    if (this.queryString.sort) {
      //MongoDB syntax to sort is sort: {price <propertyToSory>}
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      // put (-) minus sign at the start to sort by descending order
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  limit() {
    //Limiting fields to return
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

  paginate() {
    //Pagination
    const page = Number(this.queryString.page) || 1;
    const limit = Number(this.queryString.limit) || 10;
    const skip = (page - 1) * limit; //Number of documents to skip
    //Sample: ?page=2&limit=3
    //show page 2 with 3 documents only, and skip first 3 documents (which is in page 1)
    //will show only documents 4 to 6 @page 2
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
