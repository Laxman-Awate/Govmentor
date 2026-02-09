from setuptools import setup, find_packages

setup(
    name="govmentor",
    version="0.1",
    packages=find_packages(),
    install_requires=[
        'Flask==2.3.3',
        'Flask-SQLAlchemy==3.0.5',
        'Flask-Migrate==4.0.4',
        'Flask-JWT-Extended==4.5.2',
        'Flask-Cors==4.0.0',
        'python-dotenv==1.0.0',
        'Werkzeug==2.3.7',
    ],
)
