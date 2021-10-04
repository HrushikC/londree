from components import db
from components.models import Drosher, Laundromat
db.create_all()
l1 = Laundromat(name="OSU Taylor Tower")
d1 = Drosher(is_washer=True, end_time=0, laundromat_id=1, local_id=1, explicitly_filled=True)
d2 = Drosher(is_washer=True, end_time=0, laundromat_id=1, local_id=2, explicitly_filled=True)
d3 = Drosher(is_washer=False, end_time=0, laundromat_id=1, local_id=3, explicitly_filled=True)
db.session.add(l1)
db.session.add(d1)
db.session.add(d2)
db.session.add(d3)
db.session.commit()
