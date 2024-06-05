const { createClient } = require('@supabase/supabase-js')
const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_API_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

const app = express();

app.get('/test', async (req, res) => {

    const { data: stats } = await supabase
        .from('stats')
        .select('*')

    console.log("DATA", stats)
    res.json('test ok')
})


app.listen(4000); 