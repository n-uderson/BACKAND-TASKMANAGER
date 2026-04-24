require("dotenv").config();
const userRoutes = require("./routes/userRoutes");

const app = require("./app");
app.use(userRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
