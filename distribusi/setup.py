from setuptools import find_packages, setup

dependencies = ['pillow >= 6.1.0, < 7.0', 'python-magic >= 0.4.15, < 1.0']

with open('README.md', 'r') as handle:
    long_description = handle.read()

setup(
    name='distribusi',
    version='0.0.9',
    url='https://git.vvvvvvaria.org/varia/distribusi',
    license='GPLv3',
    author='Varia',
    description=(
        'Distribusi is a content management system for '
        'the web that produces static pages based on '
        'the file system.'
    ),
    long_description=long_description,
    long_description_content_type='text/markdown',
    packages=find_packages(exclude=['tests']),
    include_package_data=True,
    zip_safe=False,
    platforms='any',
    install_requires=dependencies,
    entry_points={'console_scripts': ['distribusi = distribusi.cli:cli_entrypoint']},
    classifiers=['Programming Language :: Python :: 3', 'Environment :: Console'],
)
