# Generated by Django 5.0.6 on 2024-05-26 13:03

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stock', '0005_fournisseur_ajoutstock_product_ajout_stock_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='ajoutstock',
            name='qte_transaction',
        ),
        migrations.RemoveField(
            model_name='ventestock',
            name='qte_transaction',
        ),
        migrations.AddField(
            model_name='ajoutstock',
            name='qte_gros_transaction',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='ajoutstock',
            name='qte_uniter_transaction',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='ventestock',
            name='qte_gros_transaction',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='ventestock',
            name='qte_uniter_transaction',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='ajoutstock',
            name='date',
            field=models.DateTimeField(verbose_name=datetime.datetime(2024, 5, 26, 13, 3, 40, 366824, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='ventestock',
            name='date',
            field=models.DateTimeField(verbose_name=datetime.datetime(2024, 5, 26, 13, 3, 40, 366824, tzinfo=datetime.timezone.utc)),
        ),
    ]