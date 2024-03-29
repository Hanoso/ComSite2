# Generated by Django 2.2.6 on 2019-11-11 01:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainsite', '0003_auto_20191111_0052'),
    ]

    operations = [
        migrations.AddField(
            model_name='message',
            name='dist',
            field=models.CharField(blank=True, max_length=15, null=True, verbose_name='所在城区'),
        ),
        migrations.AlterField(
            model_name='message',
            name='city',
            field=models.CharField(blank=True, max_length=15, null=True, verbose_name='所在城市'),
        ),
        migrations.AlterField(
            model_name='message',
            name='province',
            field=models.CharField(blank=True, max_length=15, null=True, verbose_name='所在省市'),
        ),
    ]
