import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// import { createClient } from '@supabase/supabase-js';
import { API_VERSION } from '@alino/shared';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// const supabaseUrl = process.env.SUPABASE_URL || '';
// const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// const _supabase = createClient(supabaseUrl, supabaseKey);

app.get('/health', (_req, res) => {
    res.json({ status: 'ok', version: API_VERSION, timestamp: new Date() });
});

app.get('/me', async (_req, res) => {
    // This is a placeholder. In a real app, you'd extract the JWT from headers.
    // const token = req.headers.authorization?.split(' ')[1];
    // const { data: { user }, error } = await supabase.auth.getUser(token);
    res.json({ message: 'Auth implementation required middleware' });
});

app.listen(port, () => {
    console.log(`API listening at http://localhost:${port}`);
});
