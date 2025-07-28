
# MERN Stack Backend Deployment Guide (AWS Ubuntu + Nginx + PM2)

## 🔑 Step 1: Connect to AWS VPS via SSH

```bash
ssh -i path/to/key.pem ubuntu@your-aws-public-ip

```

----------

## 🛠 Step 2: Update and Install Essentials

Update system packages and install Node.js, npm, and PM2:

```bash
sudo apt update && sudo apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2
pm2 startup  # Follow the instructions it prints

```

----------

## 🧩 Step 3: Install MongoDB (Optional)

```bash
curl -fsSL https://pgp.mongodb.com/server-7.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor
echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt update
sudo apt install -y mongodb-org
sudo systemctl enable mongod
sudo systemctl start mongod

```

----------

## 🧱 Step 4: Install and Start Nginx

```bash
sudo apt install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx

```

----------

## 🔐 Step 5: Allow Port 80/443 Access

### In AWS Security Group:

-   Go to EC2 → Your Instance → Security Groups → Inbound Rules
    
-   Add rules:
    
    -   Type: HTTP | Port: 80 | Source: Anywhere
        
    -   Type: HTTPS | Port: 443 | Source: Anywhere
        

### On Ubuntu Firewall:

```bash
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw enable
sudo ufw status

```

----------

## 🔑 Step 6: Set Up SSH Key for GitHub

Generate and add SSH key:

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
cat ~/.ssh/id_ed25519.pub

```

-   Copy and add the key to GitHub → Settings → SSH and GPG Keys → New SSH Key
    

----------

## 📦 Step 7: Clone Project and Start with PM2

```bash
cd /var/www/html
git clone git@github.com:your-username/your-repo.git
cd your-repo
npm install

```

Start the backend using PM2:

```bash
pm2 start npm --name my-backend -- start
pm2 save

```

----------

## 🌐 Step 8: Configure Nginx as Reverse Proxy

Create an Nginx config:

```bash
sudo nano /etc/nginx/sites-available/my-backend

```

Paste the following config:

```nginx
server {
    listen 80;
    server_name your_domain_or_ip;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

```

Enable and reload:

```bash
sudo ln -s /etc/nginx/sites-available/my-backend /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

```

----------

## 🔒 Step 9: (Optional) Enable HTTPS with Certbot

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d yourdomain.com

```

----------

## 🔄 Step 10: Ensure PM2 Auto-Start on Reboot

```bash
pm2 startup  # Follow the printed command
pm2 save

```

----------

## ✅ Done!

Your backend is now live at:

-   [http://your-server-ip](http://your-server-ip/)
    
-   [http://yourdomain.com](http://yourdomain.com/) (if configured)
 