import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';

app.use('/', userRoutes);
app.use('/', authRoutes);

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({
      error: `${err.name} ${err.message}`,
    });
  } else if (err) {
    res.status(400).json({
      error: `${err.name} ${err.message}`,
    });
    console.err(err);
  }
});
