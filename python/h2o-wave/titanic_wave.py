from h2o_wave import site, ui

page = site['/demo']

page['example'] = ui.frame_card(
    box='1 1 6 5',
    title='Example',
    path='/titanic_report.html',
)

page.save()
