from components import ma


class UserSchema(ma.Schema):
    class Meta:
        fields = ('id', 'email', 'verified', 'default_laundromat_id')


class LaundromatSchema(ma.Schema):
    class Meta:
        fields = ('id', 'university', 'dorm', 'floor')


class DrosherSchema(ma.Schema):
    class Meta:
        fields = ('id', 'is_washer', 'end_time', 'local_id', 'laundromat_id', 'used_by')
