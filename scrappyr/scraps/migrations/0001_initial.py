# -*- coding: utf-8 -*-
# Generated by Django 1.10.7 on 2017-04-28 04:31
from __future__ import unicode_literals

from django.db import migrations, models
import django.utils.timezone
import model_utils.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Scrap',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', model_utils.fields.AutoCreatedField(default=django.utils.timezone.now, editable=False, verbose_name='created')),
                ('modified', model_utils.fields.AutoLastModifiedField(default=django.utils.timezone.now, editable=False, verbose_name='modified')),
                ('raw_title', models.CharField(max_length=100, verbose_name='Raw scrap title')),
                ('markup_type', models.CharField(choices=[('markdown', 'markdown')], default='markdown', max_length=10)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
