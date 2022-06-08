exports.getOverview = (req, res) => {
  res.status(200).render('overview', {
    title: 'Home',
  });
};

exports.getTour = (req, res) => {
  res.status(200).render('tour', {
    title: 'Tour Details',
  });
};
