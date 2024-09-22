import datetime
from threading import Timer
from wsgiref.simple_server import WSGIServer
from flask import Flask, request, render_template

from report_day.start import category
from report_week.Report import week_report
import webbrowser
from os.path import dirname, basename, isfile, join
import glob
modules = glob.glob(join(dirname(__file__), "*.py"))
__all__ = [basename(f)[:-3] for f in modules if isfile(f) and not f.endswith('__init__.py')]

app = Flask(__name__)

@app.route('/category')
def report_category(message=''):
    return render_template('./category.html', message=message)

@app.route('/')
def report_week(message=''):
    date_now = datetime.datetime.now() - datetime.timedelta(1)
    date_7 = date_now - datetime.timedelta(6)
    return render_template('./reports_week.html', message=message, date_7=date_7.strftime("%Y-%m-%d"),
                           date_now=date_now.strftime("%Y-%m-%d"))  # This should be the name of your HTML file


@app.route('/', methods=['GET', 'POST'])
def report_week_post():
    adress = request.form.get('adres')
    adress_aht = request.form.get('adress_aht')
    adress_missed = request.form.get('adress_missed')
    start_date = request.form['start']
    end_date = request.form['end']
    result = 0
    if adress != '':
        result = week_report(adress,  adress_aht, adress_missed, start_date, end_date)
    if result > 0:
        adress = ''
        adress_aht = ''
        adress_missed = ''
        start_date = ''
        end_date = ''
        return report_week('Отчет составлен, если хотите сделать новый введите адрес файла. '
                           'Всего оценок до перерасчета: ' + str(result))
    else:
        adress = ''
        adress_aht = ''
        adress_missed = ''
        start_date = ''
        end_date = ''
        return report_week('Отчет не создался, попробуйте ввести другой адрес')


@app.route('/category', methods=['GET', 'POST'])
def report_category_post():
    adress = request.form.get('adres_category')
    result = 0
    if adress != '':
        print(adress)
        result = category(adress)
    if result > 0:
        adress = ''
        return report_category('Отчет составлен, если хотите сделать новый введите адрес файла. '
                           'Всего оценок до перерасчета: ' + str(result))
    else:
        adress = ''
        return report_category('Отчет не создался, попробуйте ввести другой адрес')


def open_browser():
    webbrowser.open_new("http://127.0.0.1:5000")

if __name__ == '__main__':
    Timer(1, open_browser).start()
    app.run( host="0.0.0.0", port=5000, threaded=True)
    # app.run( host="192.168.254.4", port=5000, threaded=True)
    # http_server = WSGIServer(('192.168.254.4', 8080), app)
    # http_server.serve_forever()
