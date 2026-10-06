import unittest, sys
from pathlib import Path
from unittest.mock import patch
sys.path.insert(0,str(Path(__file__).resolve().parents[1]))
import adapters
class Page:
    def wait_for_timeout(self,n):pass
class Tests(unittest.TestCase):
    def test_scrolling_accumulates_virtualized_rows(self):
        calls=iter([[{'sourceId':'1'}],[{'sourceId':'2'}]]+[[{'sourceId':'2'}]]*20)
        with patch.object(adapters,'read',side_effect=lambda *_:next(calls)),patch.object(adapters,'scroll_step',return_value={'height':100,'top':100,'bottom':True}):
            self.assertEqual(len(adapters.collect_scrolling(Page(),'schedule','grid',2)),2)
    def test_incomplete_schedule_is_rejected(self):
        with patch.object(adapters,'read',return_value=[{'sourceId':'1'}]),patch.object(adapters,'scroll_step',return_value={'height':100,'top':100,'bottom':True}):
            with self.assertRaisesRegex(RuntimeError,'expected 2'):adapters.collect_scrolling(Page(),'schedule','grid',2)
    def test_stable_ids_deduplicate_repeated_rows(self):
        with patch.object(adapters,'read',return_value=[{'sourceId':'1'},{'sourceId':'1'}]),patch.object(adapters,'scroll_step',return_value={'height':100,'top':100,'bottom':True}):
            self.assertEqual(len(adapters.collect_scrolling(Page(),'schedule','grid',1)),1)
if __name__=='__main__':unittest.main()
