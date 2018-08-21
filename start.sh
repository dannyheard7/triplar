redis-server &

cd backend
source activate triplar 
nohup python manage.py runserver &
nohup python manage.py rqworker default &

cd ../frontend
nohup npm start &
