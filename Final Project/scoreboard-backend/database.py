import sqlalchemy.exc
from sqlalchemy import create_engine, MetaData
from sqlalchemy import Table, Column, Integer, String, insert, update, select, desc, asc
from sqlalchemy.orm import sessionmaker


class Database:
    __instance = None

    @classmethod
    def get_instance(cls):  # Singleton
        if not cls.__instance:
            cls.__instance = Database()
        return cls.__instance

    def __init__(self):
        self.metadata = MetaData()
        self.engine = create_engine('sqlite:///score.db', echo=True, connect_args={"check_same_thread": False})
        SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=self.engine)
        self.db = SessionLocal()
        try:
            self.score = Table('score', self.metadata, autoload=True, autoload_with=self.engine)
        except sqlalchemy.exc.NoSuchTableError:
            self.__database_initialize(score=True)
        try:
            self.game_info = Table('gameInfo', self.metadata, autoload=True, autoload_with=self.engine)
        except sqlalchemy.exc.NoSuchTableError:
            self.__database_initialize(game_info=True)
        self.__initialize_game()
        self.game_info_set = self.get_all_game_info()

    def __database_initialize(self, score=False, game_info=False):
        if score:
            self.score = Table('score', self.metadata,
                               Column('id', Integer(), primary_key=True, autoincrement=True),
                               Column('name', String(255)),
                               Column('score', Integer()),
                               Column('unit', String(255)),
                               Column('gameId', Integer()),
                               )
        if game_info:
            self.game_info = Table('gameInfo', self.metadata,
                                   Column('gameId', Integer(), primary_key=True),
                                   Column('gameName', String(255)),
                                   Column('sortType', String(10)),
                                   )
        self.metadata.create_all(self.engine)

    def __initialize_game(self):
        games_info = [
            {
                'gameId': 0,
                'gameName': "Card Matching",
                'sortType': "desc"
            },
            {
                'gameId': 1,
                'gameName': "Shadow Game",
                'sortType': "desc"
            },
            {
                'gameId': 2,
                'gameName': "With Book",
                'sortType': "desc"
            },
            {
                'gameId': 3,
                'gameName': "Maze Easy",
                'sortType': "desc"
            },
            {
                'gameId': 4,
                'gameName': "Maze Medium",
                'sortType': "desc"
            },
            {
                'gameId': 5,
                'gameName': "Maze Hard",
                'sortType': "desc"
            },
            {
                'gameId': 6,
                'gameName': "Maze Extreme",
                'sortType': "desc"
            },
            {
                'gameId': 7,
                'gameName': "Flappy Bird",
                'sortType': "desc"
            },
        ]

        game_info_set = self.get_all_game_info()
        game_id_info = list(map(lambda row: row['gameId'], game_info_set))

        for info in games_info:
            _game_id = info['gameId']
            _game_name = info['gameName']
            _sort_type = info['sortType']
            if not info['gameId'] in game_id_info:
                self.add_game_info(game_id=_game_id, game_name=_game_name, sort_type=_sort_type)
            else:
                id_list_index = game_id_info.index(info['gameId'])
                corresponding_info = game_info_set[id_list_index]
                if corresponding_info['gameName'] != _game_name or corresponding_info['sortType'] != _sort_type:
                    self.update_game_info(game_id=_game_id, game_name=_game_name, sort_type=_sort_type)

    def add_score(self, name, score, unit, game_id):
        stmt = insert(self.score).values(name=name, score=score, unit=unit, gameId=game_id)
        self.db.execute(stmt)
        self.db.commit()

    def get_score(self, game_id, limit=10):
        sort_type = None
        for info in self.game_info_set:
            if info['gameId'] == game_id:
                sort_type = info['sortType']
                break
        if sort_type == 'desc':
            stmt = select(self.score).where(self.score.c.gameId == game_id).order_by(desc(self.score.c.score)).limit(
                limit)
        elif sort_type == 'asc':
            stmt = select(self.score).where(self.score.c.gameId == game_id).order_by(asc(self.score.c.score)).limit(
                limit)
        else:
            stmt = None
            pass  # TODO fix it. raise error here.
        result = self.db.execute(stmt)
        score_set = [dict(row) for row in result]
        return score_set

    def add_game_info(self, game_id, game_name, sort_type):
        stmt = insert(self.game_info).values(gameId=game_id, gameName=game_name, sortType=sort_type)
        self.db.execute(stmt)
        self.db.commit()

    def update_game_info(self, game_id, game_name, sort_type):
        stmt = update(self.game_info).where(self.game_info.c.gameId == game_id).values(gameName=game_name,
                                                                                       sortType=sort_type)
        self.db.execute(stmt)
        self.db.commit()

    def get_all_game_info(self):
        stmt = select(self.game_info)
        result = self.db.execute(stmt)
        game_info_set = [dict(row) for row in result]
        return game_info_set
