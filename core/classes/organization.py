from apps.kupon import models


class Organization:
    _model = models.Organization
    name = ''

    def __init__(self, name):
        self.name = name
