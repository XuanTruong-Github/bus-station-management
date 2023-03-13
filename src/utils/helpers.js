export default {
  getPagination(page, size = 15) {
    const from = (page - 1) * size;
    const to = from + size - 1;
    return { from, to };
  },
};
