from ..functions.string import string_generator


class Offer:

    @classmethod
    def generate_code(cls, length=100) -> str:
        return string_generator(length)
