# Generated by Django 3.2.8 on 2021-11-17 11:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('kupon', '0008_auto_20211116_1116'),
    ]

    operations = [
        migrations.AddField(
            model_name='organization',
            name='balance',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
    ]