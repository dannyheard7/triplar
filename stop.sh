redis-cli shutdown

kill $(ps aux | grep '[p]ython manage.py runserver' | awk '{print $2}')
kill $(ps aux | grep 'react' | awk '{print $2}')

rm frontend/nohup.out
rm backend/nohup.out