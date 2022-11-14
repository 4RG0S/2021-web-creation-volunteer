from flask import Flask, jsonify
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS
from database import Database


app = Flask(__name__)
api = Api(app)
CORS(app)

database = Database()


class SetScore(Resource):
    def post(self):
        try:
            parser = reqparse.RequestParser()
            parser.add_argument('name', type=str)
            parser.add_argument('score', type=int)
            parser.add_argument('unit', type=str)
            parser.add_argument('gameId', type=int)
            args = parser.parse_args()

            _user_name = args['name']
            _user_score = args['score']
            _score_unit = args['unit'] if args['unit'] else "점"
            _game_id = args['gameId']

            database.add_score(name=_user_name, score=_user_score, unit=_score_unit, game_id=_game_id)

            score_set = database.get_score(game_id=_game_id, limit=1000000)

            rank = 1
            last_score = score_set[0]["score"]
            for row in score_set:
                if row["score"] != last_score:
                    last_score = row["score"]
                    rank += 1
                if row["name"] == _user_name and row["score"] == _user_score:
                    break

            return {'status': 200, 'rank': rank}

        except Exception as e:
            return {'error': str(e)}


class GetScore(Resource):
    def post(self):
        try:
            parser = reqparse.RequestParser()
            parser.add_argument('gameId', type=int)
            args = parser.parse_args()

            _game_id = args['gameId']

            score_set = database.get_score(game_id=_game_id)

            print("score_set:", score_set)

            if len(score_set) < 5:
                return jsonify(score_set)
            else:
                return jsonify(score_set[:5])

        except Exception as e:
            return {'error': str(e)}


api.add_resource(SetScore, '/set_score')
api.add_resource(GetScore, '/get_score')


@app.route('/')
def hello_world():  # test routing.
    return 'Hello World!'


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8800)
