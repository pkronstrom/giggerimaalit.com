from flask import Flask, render_template, send_file
from flask_restful import reqparse, Resource, Api
import json
import os

app = Flask(__name__)
api = Api(app)

parser = reqparse.RequestParser()

@app.route('/')
def index():
    return render_template('index.html')

class VideoListApi(Resource):

    def get_video_names(self):
        return [file_name for file_name in os.listdir('videos')]

    def get(self):
        return self.get_video_names()


class VideoApi(Resource):
    def get(self, video_name):
        if video_name in os.listdir('videos'):
            return send_file("videos/" + video_name)
        else:
            print("Can't find file ", video_name)

api.add_resource(VideoListApi, '/api/videos')
api.add_resource(VideoApi, '/api/videos/<string:video_name>')


if __name__ == '__main__':
    app.run(debug=True)
